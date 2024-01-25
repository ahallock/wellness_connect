class TextTierValidator < ActiveModel::EachValidator
  TEXT_TIERS = {
    text_standard: 200,
    text_long: 2000,
    text_huge: 20000
  }

  def validate_each(record, attribute, value)
    return unless value.present?

    tier = TEXT_TIERS[options[:tier]]
    return unless tier
    if value.length > tier
      record.errors.add(
        attribute,
        (options[:message] || "is too long (maximum is #{tier} characters)")
      )
    end
  end
end
