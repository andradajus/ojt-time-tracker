class AddAdditionalDetailsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :preferred_name, :string
    add_column :users, :contact_number, :string
    add_column :users, :emergency_contact_name, :string
    add_column :users, :emergency_contact_number, :string
    add_column :users, :role, :string
  end
end
