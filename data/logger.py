import logging

from configs import SRC_PATH
from utils import unix_timestamp_today

log_path = '{}/log_{}.log'.format(SRC_PATH, unix_timestamp_today())

formatter = logging.Formatter(fmt='%(asctime)-15s %(levelname)-8s %(message)s')
handler = logging.FileHandler(log_path, 'a+')
handler.setFormatter(formatter)

logger = logging.getLogger('blockterm')
logger.setLevel(logging.INFO)
logger.addHandler(handler)
