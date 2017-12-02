class MentionTotalCount

  def initialize(subreddit_id, timestamp)
    @subreddit_id = subreddit_id
    @timestamp = timestamp
    @total_count = 0
    self
  end

  def increment_by(increment)
    @total_count += increment
  end

  def count
    @total_count
  end

  def subreddit_id
    @subreddit_id
  end

  def timestamp
    @timestamp
  end
end
