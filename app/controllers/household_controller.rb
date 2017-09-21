class HouseholdController < ActionController::API
  def index
    render json: Household.all
  end

  def create
    household = Household.new(household_params)

    if household.save
    else
    end
  end

  def edit
  end

  private

  def household_params
    params.require(:household).permit(:address_1, :address_2, :city, :state, :bedroom_count)
  end
end
