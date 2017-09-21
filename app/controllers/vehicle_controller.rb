class VehicleController < ActionController::API
  def index
    render json: Vehicle.all
  end

  def create
    vehicle = Vehicle.new(vehicle_params)

    if vehicle.save
    else
    end
  end

  def edit
    vehicle = Vehicle.find(params[:id])

    if vehicle.update_attributes(vehicle_params)
    else
    end
  end

  private
  
  def vehicle_params
    params.require(:vehicle).permit(:make, :model, :year, :license_plate, :owner_id)
  end
end
