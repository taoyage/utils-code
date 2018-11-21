/*
* @Author: accord
* @Date:   2017-11-24 10:45:38
* @Last Modified by:   accord
* @Last Modified time: 2017-11-24 10:47:19
*/

/**
 * 插入或更新
 */
INSERT INTO lifecycle.valuation(underlying_id, trade_price, settle_price, valuation_date)
    VALUES ('beier', 1000, 2000, to_timestamp('2017-11-24 18:15:40', 'YYYY-MM-DD HH24:MI:SS'))
ON CONFLICT (underlying_id, valuation_date)
DO UPDATE set(trade_price, settle_price) = (1000, 2500)
WHERE lifecycle.valuation.underlying_id = 'beier';


/**
 * 复杂的多表联查
 */
select
  a.underlying_id,underlying_name, coupon_rate, issue_scale, issue_date, maturity_date, accrual_method, accrual_payment_frequency, principal_back_frequency,
  transaction_id, trading_price_total, settle_amount_total, notional_amount_total,
  trade_price, settle_price, valuation_date
FROM
  (select * from lifecycle.assets) a
  left JOIN (select transaction_id,underlying_id,
    avg(
        case
          when buy_sell = 'buy' then 1
          when buy_sell = 'sell' then -1
        END * trading_price
      ) as trading_price_total,
    avg(
        case
          when buy_sell = 'buy' then 1
          when buy_sell = 'sell' then -1
        END * settle_amount
      ) as settle_amount_total,
    sum(
        case
          when buy_sell = 'buy' then 1
          when buy_sell = 'sell' then -1
        END * notional_amount
      ) as notional_amount_total
    from lifecycle.transaction
    group by transaction_id, underlying_id
  ) t
  on t.underlying_id = a.underlying_id
  left join (
    SELECT
      underlying_id,
      trade_price,
      settle_price,
      valuation_date
    FROM lifecycle.valuation v
    WHERE id IN (
      SELECT id
      FROM (
             SELECT
               id,
               row_number()
               OVER (
                 PARTITION BY underlying_id
                 ORDER BY valuation_date DESC ) rn
             FROM lifecycle.valuation v
           ) tmp
      WHERE rn = 1
    )
  ) v
  on a.underlying_id = v.underlying_id;