class SummaryController < ActionController::API
  def show
    summary_data = Household.summary_data(params[:id])

    render json: summary_data
  end
end
