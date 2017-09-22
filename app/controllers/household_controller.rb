class HouseholdController < ActionController::API
  def create
    household = Household.new(household_params)

    if household.save
      render json: household.id.to_json, status: :created
    else
      render json: { errors: household.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def residents
    residents = Household.find(params[:id]).residents

    render json: residents.as_json(only: [:id, :first_name, :last_name])
  end

  def summary
    summary_data = Household.summary_data(params[:id])
    
    render json: summary_data
  end

  private

  def household_params
    params.require(:household).permit(:address_1, :address_2, :city, :state, :bedroom_count)
  end
end
