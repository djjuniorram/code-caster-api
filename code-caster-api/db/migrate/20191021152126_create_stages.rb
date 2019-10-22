class CreateStages < ActiveRecord::Migration[6.0]
  def change
    create_table :stages do |t|
      t.integer :game_id

      t.timestamps
    end
  end
end
