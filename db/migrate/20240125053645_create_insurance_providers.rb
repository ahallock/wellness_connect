class CreateInsuranceProviders < ActiveRecord::Migration[7.1]
  def change
    create_table :insurance_providers do |t|
      t.string :name, null: false, limit: 200
      t.string :slug, null: false, limit: 200

      t.timestamps
    end
  end
end
