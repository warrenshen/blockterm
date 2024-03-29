class SubredditBlob

  ATTRIBUTES_WHITELIST = [
    :active_user_count_now,
    :post_count_24h,
    :comment_count_24h,
    :subscriber_count_now,
  ]

  attr_reader :attributes_map

  def initialize(blob)
    initialize_map = ActiveSupport::JSON.decode(blob)
    @attributes_map = {}

    initialize_map.each do |attribute, value|
      next if value.nil?

      if ATTRIBUTES_WHITELIST.include?(attribute.to_sym)
        @attributes_map[attribute] = value
      end
    end
    self
  end

  def update_attribute(attribute, value)
    if !value.nil? and ATTRIBUTES_WHITELIST.include?(attribute.to_sym)
      @attributes_map[attribute] = value
    end
  end

  def serialize
    @attributes_map.to_json
  end

  def camel_case_serialize
    @attributes_map.transform_keys { |key| key.to_s.camelize(:lower) }.to_json
  end
end
