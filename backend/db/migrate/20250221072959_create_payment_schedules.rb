class CreatePaymentSchedules < ActiveRecord::Migration[7.1]
  def change
    create_table :payment_schedules do |t|
      t.references :user, null: false, foreign_key: true
      t.date :date
      t.decimal :amount, precision: 10, scale: 2
      t.string :bank_name
      t.string :account_number
      t.string :status
      t.date :date_paid

      t.timestamps
    end
  end
end
