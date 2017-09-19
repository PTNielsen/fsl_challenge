class CreateVehicles < ActiveRecord::Migration[5.1]
  def up
    create_table :vehicles do |t|
      t.string  :make
      t.string  :model
      t.integer :year
      t.string  :license_plate, unique: true
      t.integer :owner_id, index: true
      t.timestamps null: false
    end
  end

  def down
    drop_table :vehicles
  end
end
