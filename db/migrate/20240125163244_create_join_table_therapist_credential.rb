class CreateJoinTableTherapistCredential < ActiveRecord::Migration[7.1]
  def change
    create_join_table :therapists, :credentials do |t|
      t.index :therapist_id
    end
  end
end
