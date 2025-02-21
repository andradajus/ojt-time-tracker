class CreatePaymentProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :payment_profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :mode_of_payment
      t.string :bank_or_wallet_name
      t.string :account_name
      t.string :account_number
      t.decimal :first_monthly_payment, precision: 10, scale: 2
      t.decimal :second_monthly_payment, precision: 10, scale: 2
      t.decimal :monthly_payment, precision: 10, scale: 2

      t.timestamps
    end
  end
end
