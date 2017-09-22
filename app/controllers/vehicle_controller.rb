class VehicleController < ActionController::API
  def create
    vehicle = Vehicle.new(vehicle_params)

    if vehicle.save
      render json: vehicle, status: :created
    else
      render json: { errors: vehicle.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  
  def vehicle_params
    params.require(:vehicle).permit(:make, :model, :year, :license_plate, :owner_id)
  end
end
