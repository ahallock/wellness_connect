# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_25_153532) do
  create_table "credentials", force: :cascade do |t|
    t.string "name", limit: 200, null: false
    t.string "abbreviation", limit: 200
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["abbreviation"], name: "index_credentials_on_abbreviation", unique: true
    t.index ["name"], name: "index_credentials_on_name", unique: true
  end

  create_table "insurance_providers", force: :cascade do |t|
    t.string "name", limit: 200, null: false
    t.string "slug", limit: 200, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_insurance_providers_on_name", unique: true
    t.index ["slug"], name: "index_insurance_providers_on_slug", unique: true
  end

  create_table "offices", force: :cascade do |t|
    t.string "name", limit: 200, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_offices_on_name", unique: true
  end

  create_table "therapists", force: :cascade do |t|
    t.string "first_name", limit: 200, null: false
    t.string "last_name", limit: 200, null: false
    t.boolean "telehealth", null: false
    t.string "profession", limit: 200, null: false
    t.boolean "license_valid", null: false
    t.string "website", limit: 200
    t.string "email", limit: 200, null: false
    t.text "bio", limit: 2000, null: false
    t.string "phone", limit: 200, null: false
    t.string "avatar_url", limit: 200, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
