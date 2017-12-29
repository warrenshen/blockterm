# == Schema Information
#
# Table name: dashboard_items
#
#  id                :integer          not null, primary key
#  user_id           :integer          not null
#  identifier        :string           not null
#  w                 :integer          default(0), not null
#  h                 :integer          default(0), not null
#  x                 :integer          default(0), not null
#  y                 :integer          default(0), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  dashboard_page_id :integer          not null
#
# Indexes
#
#  index_dashboard_items_on_dashboard_page_id  (dashboard_page_id)
#  index_dashboard_items_on_user_id            (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (dashboard_page_id => dashboard_pages.id)
#  fk_rails_...  (user_id => users.id)
#

class DashboardItem < ApplicationRecord
  belongs_to :dashboard_page
  belongs_to :user
end
