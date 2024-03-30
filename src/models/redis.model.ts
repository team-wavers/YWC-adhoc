import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { Rank } from '../@types/RedisStore';

export class RedisStore extends Model<Rank> implements Rank {
    declare _id: number;
    declare store_name?: string;
    declare count?: number;
    declare updated_at?: Date;
    declare created_at: Date;

    static initModel(sequelize: Sequelize.Sequelize): typeof RedisStore {
        RedisStore.init(
            {
                _id: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                },
                store_name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                count: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'ranks',
                modelName: 'rank',
                freezeTableName: true,
                timestamps: false,
                paranoid: false,
                indexes: [
                    {
                        name: 'PRIMARY',
                        unique: true,
                        using: 'BTREE',
                        fields: ['_id'],
                    },
                ],
            }
        );

        return RedisStore;
    }
}
