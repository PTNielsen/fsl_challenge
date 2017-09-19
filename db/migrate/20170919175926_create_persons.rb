class CreatePersons < ActiveRecord::Migration[5.1]
  def up
    create_table :persons do |t|
      t.string  :first_name
      t.string  :last_name
      t.string  :email, index: {unique: true}
      t.integer :age
      t.string  :gender
      t.integer :household_id, index: true
      t.timestamps null: false
    end
  end

  def down
    drop_table :persons
  end
end
