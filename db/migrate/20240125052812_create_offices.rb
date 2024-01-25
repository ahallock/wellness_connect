class CreateOffices < ActiveRecord::Migration[7.1]
  def change
    create_table :offices do |t|
      t.string :name, null: false, limit: 200, index: { unique: true }

      t.timestamps
    end
  end
end
