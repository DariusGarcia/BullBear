import AnalystRating from '../AnalystRating/analystRating'
import CompanyInfo from '../CompanyInfo/companyInfo'
import CompanyStats from '../CompanyInfo/companyStats'
import SimilarStocks from '../SimilarStocks/similarStocks'
import SingleStockNews from '../SingleStockNews/singleStockNews'
import StockAboutInfo from '../StockAboutInfo/stockAboutInfo'
import StockChart from './stockChart'

export const StockMoreInfo = (props) => {
  const {
    stockNews,
    stockData,
    companyDetails,
    companyProfile,
    ticker,
    stockPeers,
    stockRatings,
  } = props

  return (
    <>
      {companyDetails &&
        companyDetails.length > 0 &&
        stockPeers &&
        stockRatings && (
          <div className='px-4 text-white w-full  h-full overflow-hidden'>
            {/* Stock Daily Chart */}
            <StockChart stock={ticker} />

            {/* Company info */}
            <CompanyInfo
              ticker={ticker}
              companyDetails={companyDetails}
              companyProfile={companyProfile}
              stockData={stockData}
            />

            {/* Stock stats */}
            <CompanyStats
              ticker={ticker}
              companyDetails={companyDetails}
              companyProfile={companyProfile}
              stockData={stockData}
            />

            {/* Displays similar stocks */}
            <SimilarStocks stockPeers={stockPeers} />

            <section className='md:flex md:flex-row my-4 justify-between gap-8'>
              {/* Displays stock ratings */}
              <AnalystRating stockRatings={stockRatings} />

              {/* Displays stock news articles */}
              <SingleStockNews stockNews={stockNews} />
            </section>

            {/* About the stock section*/}
            <section className='mt-8'>
              <StockAboutInfo companyDetails={companyDetails} />
            </section>
          </div>
        )}
    </>
  )
}
