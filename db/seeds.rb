# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Seeding the database...'

bitcoin_subreddit = Subreddit.create(name: 'Bitcoin')
puts "Created #{bitcoin_subreddit.name_with_r} subreddit"

ethereum_subreddit = Subreddit.create(name: 'ethereum')
puts "Created #{ethereum_subreddit.name_with_r} subreddit"

subreddits = [bitcoin_subreddit, ethereum_subreddit]

def create_one_month_subscription_counts_for_subreddit(subreddit, increment=5)
  start_date = DateTime.new(2015, 6, 22)
  subscription_count = 0
  for i in (-30..0)
    date = start_date + i.day
    SubscriptionCount.create(
      subreddit_id: subreddit.id,
      when: date,
      count: subscription_count,
    )
    subscription_count += rand(increment)
  end
  puts "Created 31 subscription counts for the #{subreddit.name_with_r} subreddit"
end

subreddits.each do |subreddit|
  create_one_month_subscription_counts_for_subreddit(subreddit)
end

def create_one_month_post_counts_for_subreddit(subreddit, k=5)
  start_date = DateTime.new(2015, 6, 22)
  for i in (-30..0)
    date = start_date + i.day
    SubscriptionCount.create(
      subreddit_id: subreddit.id,
      when: date,
      count: rand(k),
    )
  end
  puts "Created 31 post counts for the #{subreddit.name_with_r} subreddit"
end

subreddits.each do |subreddit|
  create_one_month_post_counts_for_subreddit(subreddit)
end
