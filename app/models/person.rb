class Person < ActiveRecord::Base
  belongs_to :household
  has_many :vehicles, foreign_key: :owner_id

  EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  validates :email, uniqueness: { case_sensitive: false }, format: {with: EMAIL_REGEX, message: 'format is not valid'}

  before_save :downcase_email

  private

  def downcase_email
    self.email.downcase!
  end
end
