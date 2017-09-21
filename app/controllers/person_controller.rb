class PersonController < ActionController::API
  def index
    render json: Person.all
  end

  def create
    person = Person.new(person_params)

    if person.save
    else
    end
  end

  def edit
    person = Person.find(params[:id])

    if person.update_attributes(person_params)
    else
    end
  end

  private
  
  def person_params
    params.require(:person).permit(:first_name, :last_name, :email, :age, :gender, :household_id)
  end
end
