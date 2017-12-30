# == Schema Information
#
# Table name: dashboard_pages
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  index      :integer          default(0), not null
#  name       :string           default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_dashboard_pages_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class DashboardPage < ApplicationRecord
  belongs_to :user
  has_many :dashboard_items
end