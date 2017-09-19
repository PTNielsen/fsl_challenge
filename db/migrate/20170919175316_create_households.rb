class CreateHouseholds < ActiveRecord::Migration[5.1]
  def up
    create_table :households do |t|
      t.string  :address_1
      t.string  :address_2
      t.string  :city
      t.string  :state
      t.integer :bedroom_count
      t.timestamps null: false
    end
  end

  def down
    drop_table :households
  end
end
