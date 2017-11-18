class SubredditBlob

  ATTRIBUTES_WHITELIST = [
    :post_count_24h,
    :comment_count_24h,
  ]

  attr_reader :attributes_map

  def initialize(blob)
    initialize_map = ActiveSupport::JSON.decode(blob)
    @attributes_map = {}

    initialize_map.each do |attribute, value|
      next if value.nil?

      if ATTRIBUTES_WHITELIST.include?(attribute)
        @attributes_map[attribute] = value
      end
    end
    self
  end

  def update_attribute(attribute, value)
    if !value.nil? and ATTRIBUTES_WHITELIST.include?(attribute)
      @attributes_map[attribute] = value
    end
  end

  def serialize
    @attributes_map.to_json
  end
end
