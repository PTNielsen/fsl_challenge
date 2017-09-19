class Person < ActiveRecord::Base
  belongs_to :household
  has_many :vehicles, foreign_key: :owner_id

  validates :email, uniqueness: true
end
