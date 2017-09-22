class Household < ActiveRecord::Base
  has_many :residents, class_name: 'Person'
  has_many :vehicles, through: :residents

  class << self
    def summary_data id
      household = includes(residents: :vehicles).find(id)
      
      return household.as_json(root: true, include: {residents: {include: :vehicles}})
    end
  end
end
