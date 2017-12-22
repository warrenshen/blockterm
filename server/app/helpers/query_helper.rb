module QueryHelper
  def self.filter_relation_by_time_range(relation, time_range, default_time_range=7.days)
    clause = 'timestamp > ?'
    now = DateTime.now
    today = Date.today

    if time_range.nil?
      relation = relation.where(clause, today - default_time_range)
    elsif time_range == 'ONE_DAY'
      relation = relation.where(clause, now - 24.hours)
    elsif time_range == 'ONE_WEEK'
      relation = relation.where(clause, today - 7.days)
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

    relation.order(timestamp: :asc)
  end

  def self.get_earliest_instance_timestamp(relation)
    earliest_instance = relation.order(timestamp: :asc).first
    if earliest_instance.nil?
      nil
    else
      earliest_instance.timestamp.to_s
    end
  end

  def self.api_key_invalid?(api_key)
    api_key != Rails.application.secrets.secret_key_api
  end

  def self.localize_timestamp(timestamp)
    timestamp.in_time_zone('Pacific Time (US & Canada)')
  end

  def self.find_subreddit_by_name(subreddit_name)
    return Subreddit.where('lower(name) = ?', subreddit_name.downcase).first
  end
end
