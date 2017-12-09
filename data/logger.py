import logging

from configs import SRC_PATH

log_path = '%s/log.log' % SRC_PATH

formatter = logging.Formatter(fmt='%(asctime)-15s %(levelname)-8s %(message)s')
handler = logging.FileHandler(log_path, 'a+')
handler.setFormatter(formatter)

logger = logging.getLogger('blockterm')
logger.setLevel(logging.INFO)
logger.addHandler(handler)
