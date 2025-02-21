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

ActiveRecord::Schema[7.1].define(version: 2025_02_21_072959) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "jwt_denylists", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylists_on_jti"
  end

  create_table "payment_profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "mode_of_payment"
    t.string "bank_or_wallet_name"
    t.string "account_name"
    t.string "account_number"
    t.decimal "first_monthly_payment", precision: 10, scale: 2
    t.decimal "second_monthly_payment", precision: 10, scale: 2
    t.decimal "monthly_payment", precision: 10, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_payment_profiles_on_user_id"
  end

  create_table "payment_schedules", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.date "date"
    t.decimal "amount", precision: 10, scale: 2
    t.string "bank_name"
    t.string "account_number"
    t.string "status"
    t.date "date_paid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_payment_schedules_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_type"
    t.boolean "is_active", default: true
    t.boolean "is_deleted", default: false
    t.string "first_name"
    t.string "middle_name"
    t.string "last_name"
    t.integer "year_level"
    t.string "course"
    t.boolean "is_onboarded", default: false
    t.string "preferred_name"
    t.string "contact_number"
    t.string "emergency_contact_name"
    t.string "emergency_contact_number"
    t.string "role"
    t.string "jti"
    t.boolean "is_paid", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "payment_profiles", "users"
  add_foreign_key "payment_schedules", "users"
end
