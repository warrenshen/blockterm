module QueryHelper
  def self.filter_relation_by_time_range(relation, time_range)
    today = Date.today
    clause = 'timestamp > ?'

    if time_range.nil? or time_range == 'ONE_WEEK'
      relation = relation.where(clause, today - 7.days)
    elsif time_range == 'ONE_MONTH'
      relation = relation.where(clause, today - 1.month)
    elsif time_range == 'THREE_MONTHS'
      relation = relation.where(clause, today - 3.months)
    elsif time_range == 'ONE_YEAR'
      relation = relation.where(clause, today - 1.year)
    end

    relation.order(timestamp: :asc)
  end
end
