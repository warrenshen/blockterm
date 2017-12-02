class SubredditMention

  def initialize(subreddit, mention_total_counts)
    @subreddit = subreddit
    @mention_total_counts = mention_total_counts
    self
  end

  def subreddit
    @subreddit
  end

  def mention_total_counts
    @mention_total_counts
  end
end
