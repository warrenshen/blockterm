class PortfolioTickerJob < ApplicationJob
  def perform(*args)
    users_with_portfolio = User.where_exists(:token_users)
    users_with_portfolio.each do |user|
      token_users = TokenUser.includes(:token).where(user_id: user.id)
      PortfolioTicker.create(
        user_id: user.id,
        value_usd: calculate_value_usd(token_users),
        value_btc: calculate_value_btc(token_users),
        value_eth: calculate_value_eth(token_users),
        timestamp: DateTime.now
      )
    end

    AdminMailer.job_status_email(
      AdminMailer::JOB_PORTFOLIO_TICKER,
      AdminMailer::JOB_STATUS_SUCCESS,
    ).deliver_now
  end

  def calculate_value_usd(token_users)
    value_usd = 0.0
    token_users.each do |token_user|
      value_usd += token_user.amount * token_user.token.price_usd
    end
    value_usd
  end

  def calculate_value_btc(token_users)
    value_btc = 0.0
    token_users.each do |token_user|
      value_btc += token_user.amount * token_user.token.price_btc
    end
    value_btc
  end

  def calculate_value_eth(token_users)
    value_eth = 0.0
    token_eth = Token.find_by_identifier('ethereum')
    token_users.each do |token_user|
      eth_price = token_user.token.price_usd / token_eth.price_usd
      value_eth += token_user.amount * eth_price
    end
    value_eth
  end
end
