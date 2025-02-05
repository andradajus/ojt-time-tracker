class AddDetailsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :user_type, :string
    add_column :users, :is_active, :boolean, default: true
    add_column :users, :is_deleted, :boolean, default: false
    add_column :users, :first_name, :string
    add_column :users, :middle_name, :string
    add_column :users, :last_name, :string
    add_column :users, :year_level, :integer
    add_column :users, :course, :string
    add_column :users, :is_onboarded, :boolean, default: false
  end
end
