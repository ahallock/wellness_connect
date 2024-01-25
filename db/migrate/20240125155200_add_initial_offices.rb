class AddInitialOffices < ActiveRecord::Migration[7.1]
  def up
    Office.create(name: "Manhattan")
    Office.create(name: "Brooklyn")
    Office.create(name: "Queens")
    Office.create(name: "The Bronx")
    Office.create(name: "Staten Island")
  end

  def down
    Office.delete_all
  end
end
