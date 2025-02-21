class PaymentSchedule < ApplicationRecord
  belongs_to :user

  validates :date, presence: true
  validates :amount, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :bank_name, presence: true, allow_blank: true
  validates :account_number, presence: true, allow_blank: true
  validates :status, presence: true
end
