class PersonController < ActionController::API
  def create
    person = Person.new(person_params)

    if person.save
      render json: person, status: :created
    else
      render nothing: true, status: :unprocessable_entity
    end
  end

  private
  
  def person_params
    params.require(:person).permit(:first_name, :last_name, :email, :age, :gender, :household_id)
  end
end
