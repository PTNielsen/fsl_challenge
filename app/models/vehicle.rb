class Vehicle < ActiveRecord::Base
  belongs_to :owner, class_name: 'Person'

  validates :license_plate, uniqueness: { case_sensitive: false }

  before_save :format_license_plate

  private

  def format_license_plate
    self.license_plate = self.license_plate.gsub(/\W/i, '').downcase
  end
end
