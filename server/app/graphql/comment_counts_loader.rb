class CommentCountsLoader < GraphQL::Batch::Loader
  def initialize(model)
    @model = model
  end

  def perform(subreddit_ids)
    today = Date.today
    records = @model.where(subreddit_id: subreddit_ids.uniq)
                    .where('timestamp > ?',  today - 14.days)
                    .to_a
    subreddit_ids.each do |subreddit_id|
      matching_records = records.select do |record|
        subreddit_id == record.subreddit_id
      end
      fulfill(subreddit_id, matching_records)
    end
  end
end
