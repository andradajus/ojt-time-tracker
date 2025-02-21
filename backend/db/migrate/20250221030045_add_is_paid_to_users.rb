class AddIsPaidToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :is_paid, :boolean, default: false
  end
end
