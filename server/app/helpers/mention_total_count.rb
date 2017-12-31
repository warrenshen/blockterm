class MentionTotalCount

  def initialize(timestamp)
    @timestamp = timestamp
    @total_count = 0
    self
  end

  def increment_by(increment)
    @total_count += increment
  end

  def max_by(count)
    @total_count = [@total_count, count].max
  end

  def count
    @total_count
  end

  def timestamp
    @timestamp
  end

  def value
    @total_count
  end
end
