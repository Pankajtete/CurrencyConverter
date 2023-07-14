class CreateData < ActiveRecord::Migration[7.0]
  def change
    create_table :data do |t|
      t.string :currency_name
      t.string :rate

      t.timestamps
    end
  end
end
