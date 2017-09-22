class AddZipToHousehold < ActiveRecord::Migration[5.1]
  def up
    add_column :households, :zip, :string
  end

  def down
    remove_column :households, :zip
  end
end
