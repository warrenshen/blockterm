# == Schema Information
#
# Table name: alerts
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  status     :integer          default("active"), not null
#  expires_at :datetime         not null
#  identifier :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_alerts_on_user_id                            (user_id)
#  index_alerts_on_user_id_and_status_and_expires_at  (user_id,status,expires_at)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class Alert < ApplicationRecord
  belongs_to :user

  enum status: {
    active: 0,
    triggered: 1,
    canceled: 2,
  }
end
