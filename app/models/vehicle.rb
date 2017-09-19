class Vehicle < ActiveRecord::Base
  belongs_to :owner, class_name: 'Person'

  validates :license_plate, uniqueness: { case_sensitive: false }

  before_save :downcase_license_plate

  private

  def downcase_license_plate
    self.license_plate.downcase!
  end
end
