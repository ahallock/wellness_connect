class CreateTherapists < ActiveRecord::Migration[7.1]
  def change
    create_table :therapists do |t|
      t.string :first_name, null: false, limit: 200
      t.string :last_name, null: false, limit: 200
      t.boolean :telehealth, null: false
      t.string :profession, null: false, limit: 200
      t.boolean :license_valid, null: false
      t.string :website, limit: 200
      t.string :email, null: false, limit: 200
      t.text :bio, null: false, limit: 2000
      t.string :phone, null: false, limit: 200
      t.string :avatar_url, null: false, limit: 200

      t.timestamps
    end
  end
end
