module QueryHelper
  ADMIN_EMAILS = [
    'warren@blockterm.com',
    'warrenzshen@gmail.com',
    'nick@blockterm.com',
    'nickzshen@gmail.com',
    'jtcdbob@gmail.com',
  ]
  AUTO_LOGIN = false
  # Convenience method: flip `AUTO_LOGIN` to true when testing API
  # through graphiql when a `current_user` is required.
  def self.get_current_user(context)
    if context[:current_user].nil? && Rails.env.development? && AUTO_LOGIN
        User.first
    else
      context[:current_user]
    end
  end

  def self.bin_relation_by_k(relation, bin_strategy, key_symbol, k=2)
    result = []
    relation = relation.each_slice(k) do |records|
      total_count = MentionTotalCount.new(records[0].timestamp)
      records.each do |record|
        if bin_strategy == 'total'
          total_count.increment_by(record.send(key_symbol))
        elsif bin_strategy == 'max'
          total_count.max_by(record.send(key_symbol))
        end
      end

      if bin_strategy == 'first'
        total_count.set_by(records[0].send(key_symbol))
      end

      result << total_count
    end
    result
  end

  def self.filter_relation_by_time_range(
    relation,
    time_range,
    bin_strategy='total',
    default_time_range=7.days,
    key_symbol=:count
  )
    clause = 'timestamp > ?'
    now = DateTime.now
    today = Date.today

    if time_range.nil?
      relation = relation.where(clause, today - default_time_range)
    elsif time_range == 'ONE_DAY'
      relation = relation.where(clause, now - 24.hours)
    elsif time_range == 'ONE_WEEK'
      relation = relation.where(clause, today - 7.days)
    elsif time_range == 'TWO_WEEKS'
      relation = relation.where(clause, today - 14.days)
    elsif time_range == 'ONE_MONTH'
      relation = relation.where(clause, today - 1.month)
    elsif time_range == 'THREE_MONTHS'
      relation = relation.where(clause, today - 3.months)
    elsif time_range == 'SIX_MONTHS'
      relation = relation.where(clause, today - 6.months)
    elsif time_range == 'ONE_YEAR'
      relation = relation.where(clause, today - 1.year)
    elsif time_range == 'THREE_YEARS'
      relation = relation.where(clause, today - 3.years)
    end

    relation = relation.order(timestamp: :asc)

    relation_count = relation.length
    if relation_count > 365
      relation = self.bin_relation_by_k(
        relation,
        bin_strategy,
        key_symbol,
        relation_count / 365,
      )
    end

    relation
  end

  def self.filter_relation_by_time_range(
    relation,
    time_range,
    bin_strategy='total',
    default_time_range=7.days,
    key_symbol=:count
  )
    clause = 'timestamp > ?'
    now = DateTime.now
    today = Date.today

    if time_range.nil?
      relation = relation.where(clause, today - default_time_range)
    elsif time_range == 'ONE_DAY'
      relation = relation.where(clause, now - 24.hours)
    elsif time_range == 'ONE_WEEK'
      relation = relation.where(clause, today - 7.days)
    elsif time_range == 'TWO_WEEKS'
      relation = relation.where(clause, today - 14.days)
    elsif time_range == 'ONE_MONTH'
      relation = relation.where(clause, today - 1.month)
    elsif time_range == 'THREE_MONTHS'
      relation = relation.where(clause, today - 3.months)
    elsif time_range == 'SIX_MONTHS'
      relation = relation.where(clause, today - 6.months)
    elsif time_range == 'ONE_YEAR'
      relation = relation.where(clause, today - 1.year)
    elsif time_range == 'THREE_YEARS'
      relation = relation.where(clause, today - 3.years)
    end

    relation = relation.order(timestamp: :asc)

    relation_count = relation.length
    if relation_count > 365
      relation = self.bin_relation_by_k(
        relation,
        bin_strategy,
        key_symbol,
        relation_count / 365,
      )
    end

    relation
  end

  def self.filter_portfolio_tickers_by_time_range(
    relation,
    time_range,
    default_time_range=7.days
  )
    clause = 'timestamp > ?'
    now = DateTime.now
    today = Date.today

    if time_range.nil?
      relation = relation.where(clause, today - default_time_range)
    elsif time_range == 'ONE_WEEK'
      relation = relation.where(clause, today - 7.days)
    elsif time_range == 'ONE_MONTH'
      relation = relation.where(clause, today - 1.month)
    elsif time_range == 'THREE_MONTHS'
      relation = relation.where(clause, today - 3.months)
    elsif time_range == 'ONE_YEAR'
      relation = relation.where(clause, today - 1.year)
    elsif time_range == 'THREE_YEARS'
      relation = relation.where(clause, today - 3.years)
    end

    relation = relation.order(timestamp: :asc)
    relation_count = relation.length

    if relation_count > 365
      result = []
      k = relation_count / 365
      relation = relation.each_slice(k) do |records|
        result << records.last
      end
      relation = result
    end

    relation
  end

  def self.get_earliest_instance_date(relation, time_zone_name)
    earliest_instance = relation.order(timestamp: :asc).first
    if earliest_instance.nil?
      nil
    else
      self.localize_timestamp(
        earliest_instance.timestamp,
        time_zone_name,
      ).to_date.to_s
    end
  end

  def self.api_key_invalid?(api_key)
    api_key != Rails.application.secrets.secret_key_api
  end

  def self.is_current_user_admin(current_user)
    return false if current_user.nil?
    return ADMIN_EMAILS.include?(current_user.email)
  end

  # The nil default value of time_zone_name is important.
  def self.localize_timestamp(timestamp, time_zone_name=nil)
    timestamp.in_time_zone(time_zone_name.nil? ? 'Pacific Time (US & Canada)' : time_zone_name)
  end

  def self.find_subreddit_by_name(name)
    Subreddit.where('lower(name) = ?', name.downcase).first
  end

  def self.find_token_by_short_name(short_name)
    Token.where('lower(short_name) = ?', short_name.downcase).first
  end
end
