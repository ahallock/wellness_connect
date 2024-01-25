class CreateCredentials < ActiveRecord::Migration[7.1]
  def change
    create_table :credentials do |t|
      t.string :abbreviation, index: { unique: true }, limit: 200
      t.string :name, null: false, limit: 200

      t.timestamps
    end
  end
end
