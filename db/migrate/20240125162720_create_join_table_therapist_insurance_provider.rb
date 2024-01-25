class CreateJoinTableTherapistInsuranceProvider < ActiveRecord::Migration[7.1]
  def change
    create_join_table :therapists, :insurance_providers do |t|
      t.index :therapist_id
    end
  end
end
