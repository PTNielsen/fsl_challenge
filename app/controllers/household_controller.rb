class HouseholdController < ActionController::API
  def create
    household = Household.new(household_params)

    if household.save
      render json: household.id.to_json, status: :created
    else
      render nothing: true, status: :unprocessable_entity
    end
  end

  private

  def household_params
    params.require(:household).permit(:address_1, :address_2, :city, :state, :bedroom_count)
  end
end
