class Person < ActiveRecord::Base
  belongs_to :household
  has_many :vehicles, foreign_key: :owner_id

  validates :email, uniqueness: { case_sensitive: false }

  before_save :downcase_email

  private

  def downcase_email
    self.email.downcase!
  end
end
